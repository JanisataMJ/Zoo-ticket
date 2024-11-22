import axios from "axios";
import { VehicleInterface } from "../../interface/Ivehicle";

const apiUrl = "http://localhost:8000";

// Calendar API
const getAuthHeader = (): string | null => {
  const token = localStorage.getItem("token");
  const tokenType = localStorage.getItem("token_type");
  return token && tokenType ? `${tokenType} ${token}` : null;
};

export const CreateVehicle = async (formData: FormData): Promise<any | false> => {
    console.log('Form Data:', formData);
    try {
      const response = await axios.post(`${apiUrl}/vehicles-create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",  
          Authorization: getAuthHeader(), 
        },
      });
  
      if (response.status !== 201) {
        throw new Error("Error creating animal");
      }
  
      return response.data;
    } catch (error) {
      console.error("Error creating animal:", error);
      return false;  // Return false in case of error
    }
  };

  async function GetVehicle() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/vehicles`, requestOptions)
      .then((res) => {
        if (res.status == 200) {
          return res.json();
        } else {
          return false;
        }
      });
  
    return res;
  }

  async function DeleteVehicleByID(id: Number | undefined) {
    const requestOptions = {
      method: "DELETE"
    };
  
    let res = await fetch(`${apiUrl}/vehicles/${id}`, requestOptions)
      .then((res) => {
        if (res.status == 200) {
          return true;
        } else {
          return false;
        }
      });
  
    return res;
  }

  export {
    GetVehicle,
    DeleteVehicleByID
  }