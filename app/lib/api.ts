export async function post<TResponse = any, TData = Record<string, unknown>>({
  endpoint,
  data = null,
  params = null,
  revalidate = 0,
}: {
  endpoint: string;
  data?: TData | null;
  params?: Record<string, string | number | boolean> | null;
  revalidate?: number;
}): Promise<TResponse> {
  let url = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;

  if (params) {
    const queryParams = new URLSearchParams(
      Object.entries(params).reduce<Record<string, string>>((acc, [k, v]) => {
        acc[k] = String(v);
        return acc;
      }, {})
    ).toString();
    url += `?${queryParams}`;
  }

  const options: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: data
      ? new URLSearchParams(
          Object.entries(data).reduce<Record<string, string>>((acc, [k, v]) => {
            acc[k] = String(v);
            return acc;
          }, {})
        ).toString()
      : undefined,
  };

  const res = await fetch(url, options);
  if (!res.ok) throw new Error(res.statusText);

  return res.json() as Promise<TResponse>;
}
