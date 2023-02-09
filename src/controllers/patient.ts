import { prisma } from "../db/index"
import { Request, Response } from "express";


export const addPatient = async (req:Request ,res:Response) => {
    const patient = req.body
    try {
        const patientData = await prisma.patient.create({
        data: {
          name: patient.name,
          email: patient.email,
          dni: patient.dni,
          emr: patient.emr,
          dob: patient.dob 
        },
      })
      res.json({ msg: "Patient added SUCCESSFULLY", id: patientData.id });
    } catch (error) {
        res.json({ msg: "Error, couldn't add a patient ", error});
        console.log(error);
        
    }
    
}

export const getAll= async (req:Request ,res:Response) => {
    try {
        const patients = await prisma.patient.findMany()
        res.json({patients: patients})
    } catch (error) {
        res.json({ msg: "Error, couldn't retrieve patients", error});        
        console.log(error)
        
    }   
}

export const getPatientById = async (req: Request, res: Response) => {
    const patientId = parseInt(req.params.id);    
    try {
      const patient = await prisma.patient.findUnique({
        where: {
          id: patientId,
        },
      });
            
      res.json({ msg: "Patient retrieved SUCCESSFULLY", patient });
    } catch (error) {
      res.json({ msg: "Error, couldn't retrieve patient", error });
      console.log(error);
    }
};



export const updatePatient = async (req: Request, res: Response) => {
    const patientId = parseInt(req.params.id);
    const updatedPatient = req.body;
    try {
      const patient = await prisma.patient.update({
        where: {
          id: patientId,
        },
        data: {
          name: updatedPatient.name,
          email: updatedPatient.email,
          dni: updatedPatient.dni,
          emr: updatedPatient.emr,
          dob: updatedPatient.dob,
        },
      });
      res.json({ msg: "Patient updated SUCCESSFULLY", patient });
    } catch (error) {
      res.json({ msg: "Error, couldn't update patient", error });
      console.log(error);
    }
  };


  export const deletePatient = async (req: Request, res: Response) => {
    const patientId = parseInt(req.params.id);
    try {
      const patient = await prisma.patient.delete({
        where: {
          id: patientId,
        },
      });
      res.json({ msg: "Patient deleted SUCCESSFULLY" });
    } catch (error) {
      res.json({ msg: "Error, couldn't delete patient", error });
      console.log(error);
    }
  };
