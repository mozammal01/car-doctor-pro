const { default: axios } = require("axios")

export const getServices = async () => {
  try {

    const res = await axios.get(`${process.env.NEXT_BASE_URL}/services/api/get-all`)
    const services = res.data
    return services
  }
  catch (err) {
    console.log(err);
    return [];
  }
}

export const getServicesDetails = async (id) => {
  try {

    const res = await axios.get(`${process.env.NEXT_BASE_URL}/services/api/${id}`)
    const service = res.data
    return service
  }
  catch (err) {
    console.log(err);
    return [];
  }
}
