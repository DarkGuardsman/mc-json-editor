# Minecraft Json Editor

Website based editor for working with Minecraft and Mod JSON files. Main goal is to provide a simple-to-use interface for generating files using templates.

## Client

UI is provided as a React client. Featuring a simple menu to view JSON files and editor to modify each file.

## Project Server

File access is provided as a local express.js server. Making it possible to access files and information without manually uploading information.

## Data Server

Commonly shared information is provided as an express.js server. This allows quick lookup of information regarding which items are possible and mods associated with items. Can also provide quick indication of collisions in other projects.