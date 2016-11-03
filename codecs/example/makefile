ifeq ($(OS),Windows_NT)
    LIBEXT := dll
else
    LIBEXT := dylib
endif

CFLAGS := -fPIC -O3 -g -Wall -Werror
CC := gcc
NAME := example-codec

OUTPUT_FILE = $(NAME).$(LIBEXT)

INC=-I/../../c/include

lib: $(OUTPUT_FILE)

$(OUTPUT_FILE): $(NAME).o
	$(CC) -shared -Wl $(INC) ,-soname,$(OUTPUT_FILE) $^ -o $@

clean:
	$(RM) *.o *.$(LIBEXT)*