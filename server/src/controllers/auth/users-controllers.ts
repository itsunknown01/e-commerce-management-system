import { db } from "../../services/db"

export const getUsersById = async (req: Request,res: Response) => {
    const id = "1"
    try {
      const user = await db.user.findUnique({where: {
        id
      }})
    } catch(error) {
        console.log("GET_USERS API ERROR",error)
    }
}