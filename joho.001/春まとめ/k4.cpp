#include <stdio.h>

void my_strlen(char str[],int *p){
    

}
int length(char str[]){
    int i=0;
    for(;str[i]!='\n';i++){}
    return i;
}

int main(void){
    const int N = 100;
    int count = 0;
    char str[N+1];//終端文字を読み取るため
    scanf("%s", str);
    count=length(str);
    my_strlen(str, &count);
    printf("%d\n", count);

    return 0;
}