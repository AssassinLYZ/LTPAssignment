interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

async function customFetch<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data: T = await response.json();
    const responseData: ApiResponse<T> = {
      data,
      status: response.status,
      statusText: response.statusText,
    };
    return responseData.data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
}

export async function postData<T, D>(url: string, data: D): Promise<T> {
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  return customFetch<T>(url, options);
}

export async function getData<T>(url: string): Promise<T> {
  const options: RequestInit = {
    method: "GET",
  };
  return customFetch<T>(url, options);
}
