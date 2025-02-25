{pkgs ? import <nixpkgs> {}}: let
in
  pkgs.mkShell {
    buildInputs = with pkgs; [
      alejandra
      nodejs_22
      pnpm
    ];
  }
