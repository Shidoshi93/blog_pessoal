export class UsuarioLogin {
    private usuario: string;
    private senha: string;

    constructor(usuario: string, senha: string) {
        this.usuario = usuario;
        this.senha = senha;
    }

    public getUsuario(): string {
        return this.usuario;
    }

    public setUsuario(usuario: string): void {
        this.usuario = usuario;
    }

    public getSenha(): string {
        return this.senha;
    }

    public setSenha(senha: string): void {
        this.senha = senha;
    }
}