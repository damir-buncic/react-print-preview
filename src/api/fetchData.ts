type User = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
};

export async function fetchData() {
  const response = await fetch("https://dummyjson.com/users");
  const data = await response.json();
  return data.users.map((u: User) => [u.firstName, u.lastName, u.email, u.phone, u.username]);
}
