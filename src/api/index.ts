import * as ax from "axios";
export const BASE_URL = "https://abc-limo-server.watemtrade.com";
let axios = ax.default.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
});
export async function getMe() {
  const { data } = await axios.get("/me");
  return data;
}
export async function getDashboardStat() {
  const { data } = await axios.get("/stat");
  return data;
}
export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, status } = await axios.post(
    "/auth/login",
    { email, password },
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      withCredentials: true,
    }
  );
  if (status === 200) {
    localStorage.setItem("token", data.data?.token);
    axios = ax.default.create({
      baseURL: BASE_URL,
      withCredentials: true,
      headers: {
        Authorization: "Bearer " + data.data?.token,
      },
    });
  }
  return data;
}

/*API REQUEST RELATED TO BLOG */
export async function postBlog({
  title,
  content,
  img,
}: {
  title: string;
  content: string;
  img: File;
}) {
  const { data } = await axios.post(
    "/blog",
    { title, content, img },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
}
export async function updateBlog({
  id,
  title,
  content,
  img,
}: {
  title: string;
  content: string;
  img: File;
  id: string;
}) {
  if (img) {
    const { data } = await axios.patch(
      `/blog/${id}`,
      { title, content, img },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  } else {
    const { data } = await axios.patch(
      `/blog/${id}`,
      { title, content },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  }
}
export async function getBlogs(page = 1) {
  const { data } = await axios.get(`/blog?page=${page}`);
  return data;
}
export async function getBlog(id: string) {
  const { data } = await axios.get(`/blog/${id}`);
  return data;
}
/*API REQUEST RELATED TO BLOG END */

/*AP RELATED TO SERVICE START */
export async function postService({
  title,
  content,
  img,
}: {
  title: string;
  content: string;
  img: File;
}) {
  const { data } = await axios.post(
    "/services",
    { title, content, img },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
}
export async function updateService({
  id,
  title,
  content,
  img,
}: {
  title: string;
  content: string;
  img: File;
  id: string;
}) {
  if (img) {
    const { data } = await axios.patch(
      `/services/${id}`,
      { title, content, img },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  } else {
    const { data } = await axios.patch(
      `/services/${id}`,
      { title, content },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  }
}
export async function getServices(page = 1) {
  const { data } = await axios.get(`/services?page=${page}`);
  return data;
}
export async function getService(id: string) {
  const { data } = await axios.get(`/services/${id}`);
  return data;
}
export async function deleteBlog(id: string) {
  const { data } = await axios.delete(`/blog/${id}`);
  return data;
}
export async function deleteService(id: string) {
  const { data } = await axios.delete(`/services/${id}`);
  return data;
}
/*AP RELATED TO SERVICE END */

/*API REQUEST RELATED TO VEHICLE */
export async function postVehicle({
  name,
  model,
  description,
  speed,
  type,
  pricePerDay,
  passengerSize,
  img,
  automatic,
  gpsNavigation,
  heatedSeat,
}: {
  name: string;
  model: string;
  description: string;
  speed: number;
  type: string;
  pricePerDay: string;
  passengerSize: string;
  img: File;
  automatic: number;
  gpsNavigation: number;
  heatedSeat: number;
}) {
  const { data } = await axios.post(
    "/vehicle",
    {
      name,
      model,
      description,
      speed,
      type,
      pricePerDay,
      passengerSize,
      img,
      automatic,
      gpsNavigation,
      heatedSeat,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
}
export async function updateVehicle({
  name,
  id,
  model,
  description,
  speed,
  type,
  pricePerDay,
  passengerSize,
  img,
  automatic,
  gpsNavigation,
  heatedSeat,
}: {
  id: string;
  automatic: number;
  gpsNavigation: number;
  heatedSeat: number;
  name: string;
  model: string;
  description: string;
  speed: number;
  type: string;
  pricePerDay: string;
  passengerSize: string;
  img: File;
}) {
  if (img) {
    const { data } = await axios.patch(
      `/vehicle/${id}`,
      {
        name,
        model,
        description,
        speed,
        type,
        pricePerDay,
        passengerSize,
        img,
        automatic,
        gpsNavigation,
        heatedSeat,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  } else {
    const { data } = await axios.patch(
      `/vehicle/${id}`,
      {
        name,
        model,
        description,
        automatic,
        gpsNavigation,
        heatedSeat,
        speed,
        type,
        pricePerDay,
        passengerSize,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  }
}
export async function getVehicles(page = 1) {
  const { data } = await axios.get(`/vehicle?page=${page}`);
  return data;
}
export async function getVehicle(id: string) {
  const { data } = await axios.get(`/vehicle/${id}`);
  return data;
}
export async function deleteVehicle(id: string) {
  const { data } = await axios.delete(`/vehicle/${id}`);
  return data;
}
/*API REQUEST RELATED TO BLOG END */

/*API REQUEST RELATED TO Booking */
export async function updateReservation({
  id,
  status,
  firstName = "",
  lastName = "",
  fromAddress = "",
  toAddress = "",
  email = "",
  phoneNumber = "",
  luggageCount = 0,
  personCount = 0,
  journeyDate = "",
  description = "",
  vehicleId = "",
}: {
  id: string;
  status: "COMPLETED" | "PENDING" | "REJECTED";
  firstName: string;
  lastName: string;
  fromAddress: string;
  toAddress: string;
  email: string;
  phoneNumber: string;
  luggageCount: number;
  personCount: number;
  journeyDate: string;
  description: string;
  vehicleId: string;
}) {
  const { data } = await axios.patch(`/book/${id}`, { status });
  return data;
}
export async function getReservationS(page = 1) {
  const { data } = await axios.get(`/book?page=${page}`);
  return data;
}
export async function getReservation(id: string) {
  const { data } = await axios.get(`/book/${id}`);
  return data;
}
export async function deleteReservation(id: string) {
  const { data } = await axios.delete(`/book/${id}`);
  return data;
}
/*API REQUEST RELATED TO BLOG END */

/*API REQUEST RELATED TO user */

export async function logout() {
  const { data, status } = await axios.post(`/auth/logout`);
  if (status === 200) {
    localStorage.removeItem("token");
    axios = ax.default.create({
      baseURL: BASE_URL,
      withCredentials: true,
      headers: {
        Authorization: "",
      },
    });
  }
  return data;
}

export async function changePassword({
  oldPassword,
  newPassword,
  confirmPassword,
}: {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}) {
  const { data } = await axios.patch(`/user/change-password`, {
    oldPassword,
    newPassword,
    confirmPassword,
  });
  return data;
}
export async function updateProfile({
  firstName,
  lastName,
  email,
  img,
}: {
  firstName: string;
  lastName: string;
  email: string;
  img: File;
}) {
  if (img) {
    const { data } = await axios.patch(
      `/user/update-profile`,
      {
        firstName,
        lastName,
        email,
        img,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  } else {
    const { data } = await axios.patch(
      `/user/update-profile`,
      { firstName, lastName, email },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  }
}
/*API REQUEST RELATED TO BLOG END */
