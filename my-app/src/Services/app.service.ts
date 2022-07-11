export class AppService {
  public async getUsers(): Promise<any> {
    const response = await fetch("/api/users");
    return await response.json();
  }

  public async createUser(user: any) {
    const response = await fetch(`/api/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user }),
    });
    return await response.json();
  }
}
