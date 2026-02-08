#include <stdio.h>

void my_strlen(char* str,int* count){
    const int N=100;
    for(int i=0;i<N;i++){
        if(str[i]=='\0'){// '\n'ではなく'\0'
            *count=i;   
            break;
        }    
    }

}
int length(char* str){
    int i=0;
    for(;str[i];i++){
    }
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