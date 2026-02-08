#include <stdio.h>

void who_made(const char*s){
    while(*s){
        printf("%c",(*s++)+1);
        printf("\n");
    }
}
int main(void){
    who_made("HAL");
}