#include <stdio.h>

char torasu(char c){
    c%=26;
    while(!((-1<c)&&(c<26))){
        c+=26;
    }
    return c+97;
}


int main(void){
    int N=100,k=0;
    char word[N];

    for(int i=0;i<N;i++){
        scanf("%c",&word[i]);
        if(word[i]==' ')break;
        
    }

    scanf("%d",&k);
    k%=26;
    
    for(int i=0;i<N;i++){
        if(word[i]==' ')break;
        word[i]=torasu(word[i]+k);
        
        printf("%c",word[i]);
    }
    printf("\n");
}       