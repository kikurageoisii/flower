#include <stdio.h>

int main(void){
    const int N=5;
    char str[N];
    scanf("%5s",str);

    for(int i=0;i<N;i++){
        printf("%c",str[i]);
    }
}