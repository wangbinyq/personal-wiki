includes = $(wildcard *.h)

a.exe: main.cpp ${includes}
	g++ main.cpp -g -std=c++11

run: a.exe
	./a.exe > test.ppm