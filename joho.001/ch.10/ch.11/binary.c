#include<stdio.h>
int main(void){
    FILE* ipp=fopen("input.bin","rb");//fopen忘れない
    
    
    const int N=10;
    int str[N];

    size_t result = fread(str, sizeof(int), N, ipp);
    //fprintf(opp,"%d ",str);
    fclose(ipp);
    
    FILE* opp=fopen("output.txt","w");
    for(int i=0;i<N;i++){
       fprintf(opp,"%d ",str[i]);
    }
    
    //fclose(opp);
    
}