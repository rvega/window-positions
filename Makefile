PREFIX ?= /usr/local

install-dependencies:
	apt-get install wmctrl X11-utils nodejs

install-custom-wmctrl:
	cd vendors/wmctrl && ./configure --prefix=${PREFIX} && make && make install

install:
	mkdir -p ${PREFIX}/bin
	mkdir -p ${PREFIX}/share/applications
	sed -i.bak 's@{PREFIX}@${PREFIX}@' load-window-positions.desktop
	sed -i.bak 's@{PREFIX}@${PREFIX}@' save-window-positions.desktop
	install -m 755 load-window-positions ${PREFIX}/bin
	install -m 755 save-window-positions ${PREFIX}/bin
	install -m 644 *.desktop ${PREFIX}/share/applications

uninstall:
	rm ${PREFIX}/bin/load-window-positions
	rm ${PREFIX}/bin/save-window-positions
	rm ${PREFIX}/share/applications/save-window-positions.desktop
	rm ${PREFIX}/share/applications/load-window-positions.desktop

distclean:
	rm *.desktop
	mv load-window-positions.desktop.bak load-window-positions.desktop
	mv save-window-positions.desktop.bak save-window-positions.desktop

