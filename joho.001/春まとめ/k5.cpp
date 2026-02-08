#include<stdio.h>
#include<string.h> //for strlen

void file_moji_nagasa(){
    FILE* ip= fopen("input.txt","r");
    FILE* op= fopen("output.csv","w");
    const int N=50;
    char str[N+1];
    
    while(fscanf(ip,"%s",str)!=EOF)
    int mojisuu = strlen(str);
    fprintf(op,"%d,",mojisuu);

    fclose(ip);
    fclose(op);
}


int main(){
    file_moji_nagasa();
}