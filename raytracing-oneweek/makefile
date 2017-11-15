includes = $(wildcard *.h)

a.exe: main.cpp ${includes}
	g++ main.cpp -std=c++11 -fopenmp

run: a.exe
	./a.exe > test.ppm