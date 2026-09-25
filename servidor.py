#!/usr/bin/env python3
"""
Servidor local simples, só para abrir o site sem depender de duplo-clique
no arquivo (alguns navegadores bloqueiam fontes/scripts abertos via
file://). O site é 100% HTML/CSS/JS estático — isso aqui só serve os
arquivos, não é obrigatório usar.

Uso:
    python3 servidor.py
    (abre em http://localhost:8080)
"""
import http.server
import socketserver
import webbrowser
import os

PORTA = 8080

os.chdir(os.path.dirname(os.path.abspath(__file__)))


class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


if __name__ == "__main__":
    with socketserver.TCPServer(("", PORTA), Handler) as httpd:
        url = f"http://localhost:{PORTA}"
        print(f"Servindo TacticQ em {url}")
        print("Pressione Ctrl+C para parar.")
        webbrowser.open(url)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServidor encerrado.")
