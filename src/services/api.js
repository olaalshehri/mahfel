const API_URL = "http://localhost:8080/public/api";

export async function getEvents() {
  const response = await fetch(`${API_URL}/events`);

  if (!response.ok) {
    throw new Error("فشل جلب الفعاليات");
  }

  return response.json();
}

export async function getConferences() {
  const response = await fetch(`${API_URL}/conferences`);

  if (!response.ok) {
    throw new Error("فشل جلب المؤتمرات");
  }

  return response.json();
}

export async function getEventById(id) {
  const response = await fetch(`${API_URL}/events/${id}`);

  if (!response.ok) {
    throw new Error("تعذّر جلب الفعالية");
  }

  return response.json();
}

export async function getConferenceById(id) {
  const response = await fetch(`${API_URL}/conferences/${id}`);

  if (!response.ok) {
    throw new Error("تعذّر جلب المؤتمر");
  }

  return response.json();
}
export async function registerUser(userData) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "تعذّر إنشاء الحساب");
  }

  return data;
}

export async function loginUser(userData) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const text = await response.text();

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("تعذّر قراءة رد PHP، تحققي من الخطأ في السيرفر.");
  }

  if (!response.ok) {
    throw new Error(data.error || "تعذّر تسجيل الدخول");
  }

  return data;
}


export async function getCurrentUser() {
  const response = await fetch(`${API_URL}/me`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "تعذّر جلب بيانات المستخدم");
  }

  return data;
}


export async function createBooking(bookingData) {
  const response = await fetch(`${API_URL}/bookings`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "تعذّر إتمام الحجز");
  }

  return data;
}


export async function getMyBookings() {
  const response = await fetch(`${API_URL}/bookings`, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "تعذّر جلب حجوزاتك");
  }

  return data;
}


export async function logoutUser() {
  const response = await fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "تعذّر تسجيل الخروج");
  }

  return data;
}

