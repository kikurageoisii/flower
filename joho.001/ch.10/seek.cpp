#include <stdio.h>

char* seek_char(char c,char* str) {
    int kaesu=0;
    const int N=50;
    for(int i=0;i<N+1;i++){
        if(str[i]==c){
            kaesu=i;
            break;
        }
    }
    return &str[kaesu];
}

int main(void)
{
    const int N = 50;
    char c;
    char str[N+1];
    scanf("%c ", &c);
    scanf("%[^\n]", str); // このように記述することでスペースがあっても読み込みができるようになります
    printf("%s\n", seek_char(c, str));
    return 0;
}