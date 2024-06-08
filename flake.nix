{
  description = "React tic tac toe";

  outputs =
    { self, nixpkgs }:
    let
      forAllSystems =
        function:
        nixpkgs.lib.genAttrs [
          "x86_64-linux"
          "aarch64-darwin"
        ] (system: function nixpkgs.legacyPackages.${system});
    in
    {

      devShells = forAllSystems (pkgs: {
        default = pkgs.mkShell {
          name = "react-tic-tac-toe";
          packages = with pkgs; [ nodejs ];
        };
      });
    };
}
