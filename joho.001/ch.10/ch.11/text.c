#include<stdio.h>

int main(void){
    
    FILE* ipf=NULL;
    ipf=fopen("input.txt","r");

    
    const int wordlength=30;
    char str[wordlength+1];
    fscanf(ipf,"%[^\n]",str);
    fclose(ipf);

    FILE* opp=NULL;
    opp=fopen("output.txt","w");
    fprintf(opp,"%s\n",str);
    fclose(opp);
}