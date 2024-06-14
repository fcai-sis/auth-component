import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { Role } from '@fcai-sis/shared-middlewares';
import { StudentModel, UserModel } from '@fcai-sis/shared-models';

const loginStudentHandler = async (req: Request, res: Response) => {
  const { studentId, password } = req.body;

  const student = await StudentModel.findOne({ studentId });

  if (!student) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const user = await UserModel.findById(student.userId);

  if (!user) {
    return res.status(500).json({ message: 'User not found' });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate JWT token with user's id and role
  const token = jwt.sign({
    userId: student.userId.toString(),
    role: Role.STUDENT,
  }, process.env.JWT_SECRET as string);

  res.status(200).json({ token });
};

export default loginStudentHandler;
