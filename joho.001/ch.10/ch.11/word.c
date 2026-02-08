#include <stdio.h>

void split_sentence(char sentence[]){
    const int N=100;

    
    for(int i=0;sentence[i]!='\0';i++){
        if(sentence[i]==' '){
            printf("\n");
        }else{
            printf("%c",sentence[i]); //%cに対しては&がいらない
        }
    }
}


int main(void){
    const int size=100;
    char sentence[size+1];

    scanf("%[^\n]", sentence);
    char *p=sentence;

    split_sentence(p);
    return 0;
}