#include<stdio.h>
#include<string.h>

float max(float c[],const int N){
    float max=c[0];
    
    for(int i=1;i<N;i++){
        if(max<c[i])max=c[i];
    }
    return max;
}

float mini(float c[],const int N){
    float mini=c[0];
     for(int i=1;i<N;i++){
        if(mini>c[i])mini=c[i];
    }
    return mini;
}

float ave(float c[],const int N){
    float sum=0;
    for(int i=0;i<N;i++){
        sum+=c[i];
    }
    return sum/N;
}


int main(void){
    FILE* ipp=fopen("input.csv","r");
    FILE* opp=fopen("output.csv","w");//stdout;//でデバッグ;

    const int N=100;
    float c[N+1]={};
   
        
/*　cは実数なのでc[i]==EOFは絶対に成り立たない
 for(int i=0;c[i]!=EOF;i++){
            fscanf(ipp,"%f,",&c[i]);
            fprintf(opp,"%.2f,",c[i]);
        }
*/  
    int i=0;      
    while(fscanf(ipp,"%f,",&c[i])!=EOF){
        //fprintf(opp,"%.2f,",c[i]);//デバック用
        i++;
    }

    fprintf(opp,"%.2f,%.2f,%.2f",max(c,i),mini(c,i),ave(c,i));

    

}