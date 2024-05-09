import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { Role } from '@fcai-sis/shared-middlewares';
import { EmployeeModel, UserModel } from '@fcai-sis/shared-models';

const loginEmployeeHandler = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Find user by email
    // TODO: Use password
    const employee = await EmployeeModel.findOne({ username });

    if (!employee) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = await UserModel.findById(employee.userId);

    if (!user) {
      return res.status(500).json({ message: 'wtf? user not found' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token with user's id and role
    const token = jwt.sign({
      userId: employee.userId.toString(),
      role: Role.EMPLOYEE
    }, process.env.JWT_SECRET as string);

    res.json({ token });
  } catch (error) {
    console.error('User login failed:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default loginEmployeeHandler;
