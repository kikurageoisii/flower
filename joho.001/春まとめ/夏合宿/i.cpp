#include<stdio.h>

void yomu_int(int array[],int size){
    for(int i=0;i<size;i++){
        scanf("%d",&array[i]);
    }
}

int sagasu(int c[],const int N){
    int max=c[0];
    int i=1;
    for(;i<N;i++){
        if(max<c[i])max=c[i];
    }
    int j=0;
    for(;j<N;j++){
        if(max==c[j])continue;
        if(max<c[j])max=c[j];
    }
   
}


void kaku_int(int array[],int size){
    for(int i=0;i<size;i++){
        printf("%d ",array[i]);
    }
    printf("\n");

}

int main(){
    int N;
    scanf("%d",&N);
    int a[N];
    yomu_int(a,N);
    //kaku_int(b,N);
    

    printf("%d\n",sagasu(a,N));
    

    

}