import { prisma } from "../db/index"
import { Request, Response } from "express";



export const addProvider = async (req:Request ,res:Response) => {
    const provider = req.body
    try {
      const providerData = await prisma.provider.create({
        data: {
          name: provider.name,
          email: provider.email,
          phoneNumber: provider.phoneNumber,
          shifts: provider.shifts
        },
      })
      res.json({ msg: "provider added SUCCESSFULLY", id: providerData.id });
    } catch (error) {
      res.json({ msg: "Error, couldn't add a provider", error });
      console.log(error);
    }
  }

  export const getAll= async (req:Request ,res:Response) => {
    try {
        const providers = await prisma.provider.findMany()
        res.json({providers: providers})
    } catch (error) {
        res.json({ msg: "Error, couldn't retrieve providers", error});        
        console.log(error)
        
    }   
}

export const getProviderById = async (req: Request, res: Response) => {
    const providerId = parseInt(req.params.id);    
    try {
      const provider = await prisma.provider.findUnique({
        where: {
          id: providerId,
        },
      });
            
      res.json({ msg: "provider retrieved SUCCESSFULLY", provider });
    } catch (error) {
      res.json({ msg: "Error, couldn't retrieve provider", error });
      console.log(error);
    }
};


export const updateProvider = async (req: Request, res: Response) => {
  const providerId = parseInt(req.params.id);
  const updatedProvider = req.body;
  try {
    const provider = await prisma.provider.update({
      where: {
        id: providerId,
      },
      data: {
        name: updatedProvider.name,
        email: updatedProvider.email,
        phoneNumber: updatedProvider.phoneNumber,
        shifts: updatedProvider.shifts
      },
    });
    res.json({ msg: "provider updated SUCCESSFULLY", provider });
  } catch (error) {
    res.json({ msg: "Error, couldn't update provider", error });
    console.log(error);
  }
};


export const deleteProvider = async (req: Request, res: Response) => {
  const providerId = parseInt(req.params.id);
  try {
    const provider = await prisma.provider.delete({
      where: {
        id: providerId,
      },
    });
    res.json({ msg: "provider deleted SUCCESSFULLY" });
  } catch (error) {
    res.json({ msg: "Error, couldn't delete provider", error });
    console.log(error);
  }
};
