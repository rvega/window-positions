# Save and restore window positions in Linux desktops.

These are two simple programs that allow you to save the size and positions of the windows in your desktop environment into a file and then load the file and move and resize the windows automatically.

## Simple use

Open your programs, set up your windows the way you like them and run the "Save Window Positions" program. You can later recall the sizes and positions of the windows by running the "Load Window Positions" program. [Here's a video](https://vimeo.com/129056274).

## Advanced use

You can use the two programs from a command line and include them in other scripts, assign keyboard shortcuts using your desktop environment settings, auto-load them, anything you care about. The interface is pretty simple:

`save-window-positions [path-to-savefile]` and `load-window-positions [path-to-savefile]`

If you don't specify the filename, the default `~/.config/window-positions/window.json` will be used

## Installation

Clone this git repository and use the Makefile:

   git clone https://github.com/rvega/window-positions.git
   cd window-positions
   sudo install dependencies
   sudo make install

This will install to /usr/local/ by default. Read the Makefile to change that and for other goodies.

## About wmctrl

These programs use the excellent [wmctrl](https://sites.google.com/site/tstyblo//wmctrl/) under the hood. Unfortunately, the default version of wmctrl does not support minimizing windows. There is a lesser known version of wmctrl [here](https://github.com/geekless/wmctrl) created by github user geekless that allows for minimizing windows. If you want to use that version of wmctrl instead of the one that comes with your Linux distro, just do `make install-custom-wmctrl`.

## Bugs, feature requests, donations, questions, whatever.

Create a new entry on [this issue tracker](https://github.com/rvega/window-positions/issues), I'll try to respond ASAP.

## License

Copyright (C) 2015 Rafael Vega <contacto@rafaelvega.co>

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see http://www.gnu.org/licenses/.
