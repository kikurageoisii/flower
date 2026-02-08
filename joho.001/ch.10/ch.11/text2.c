#include<stdio.h>

int main(void){
    FILE* ipp =NULL;
    ipp=fopen( "input.csv","r");
    if(ipp==NULL){
        return 1;
    }
    const int N=10;
    int array[N+1]={};
    for(int i=0;i<N;i++){
    fscanf(ipp,"%d,",&array[i]);//%d,とする
    }


    fclose(ipp);
    
    FILE* opp=NULL;
    opp=fopen("output.txt","w");
    if(opp==NULL)return 1;
    for(int i=0;i<N;i++){
        if(array[i]<60){
            fprintf(opp,"ng ");
        }else {
            fprintf(opp,"ok ");
        }
    }
    fclose(opp);
}
