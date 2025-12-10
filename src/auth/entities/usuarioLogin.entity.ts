export class UsuarioLogin {
    private user: string;
    private password: string;

    constructor(user: string, senha: string) {
        this.user = user;
        this.password = senha;
    }

    public getUser(): string {
        return this.user;
    }

    public setUser(user: string): void {
        this.user = user;
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword(password: string): void {
        this.password = password;
    }
}