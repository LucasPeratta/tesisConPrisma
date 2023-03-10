import { prisma } from "../db/index";
import { Request, Response } from "express";

export const addAppointment = async (req: Request, res: Response) => {
  const appointment = req.body;
  try {
    const appointmentData = await prisma.appointment.create({
      data: {
        patientId: appointment.patientId,
        providerId: appointment.providerId,
        date: new Date(),
        time: appointment.time,
        status: appointment.status,
      },
    });
    res.json({ msg: "Appointment added SUCCESSFULLY", id: appointmentData.id });
  } catch (error) {
    res.json({ msg: "Error, couldn't add a appointment ", error });
    console.log(error);
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const appointments = await prisma.appointment.findMany();
    res.json({ appointments: appointments });
  } catch (error) {
    res.json({ msg: "Error, couldn't retrieve appointments", error });
    console.log(error);
  }
};

export const getAppointmentById = async (req: Request, res: Response) => {
  const appointmentId = parseInt(req.params.id);
  try {
    const appointment = await prisma.appointment.findUnique({
      where: {
        id: appointmentId,
      },
    });

    res.json({ msg: "Appointment retrieved SUCCESSFULLY", appointment });
  } catch (error) {
    res.json({ msg: "Error, couldn't retrieve appointment", error });
    console.log(error);
  }
};

export const updateAppointment = async (req: Request, res: Response) => {
  const appointmentId = parseInt(req.params.id);
  const updatedAppointment = req.body;
  try {
    const appointment = await prisma.appointment.update({
      where: {
        id: appointmentId,
      },
      data: {
        patientId: updatedAppointment.patienId,
        providerId: updatedAppointment.providerId,
        date: updatedAppointment.data,
        time: updatedAppointment.time,
        status: updatedAppointment.status,
      },
    });
    res.json({ msg: "Appointment updated SUCCESSFULLY", appointment });
  } catch (error) {
    res.json({ msg: "Error, couldn't update appointment", error });
    console.log(error);
  }
};

export const deleteAppointment = async (req: Request, res: Response) => {
  const appointmentId = parseInt(req.params.id);
  try {
    const appointment = await prisma.appointment.delete({
      where: {
        id: appointmentId,
      },
    });
    res.json({ msg: "Appointment deleted SUCCESSFULLY" });
  } catch (error) {
    res.json({ msg: "Error, couldn't delete appointment", error });
    console.log(error);
  }
};
