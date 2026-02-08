#include<stdio.h>

void csv_scan(const char file[],int array[],int size){
    FILE* ipfp=fopen(file,"r");
    
    if(ipfp==NULL) return;
    
    for (int i = 0; i < size; i++)
    {
        if(fscanf(ipfp,"%d",&array[i])!=1)break;
    }

    fclose(ipfp);
}

int main(){
    const int N=50; //あとで50に変更
    int a[N];
    csv_scan("50date.txt",&a[0],N);
    int sum=0;
    for(int i=0;i<N;i++){
        printf("%d\n",a[i]);
        sum+=a[i];
    }
    printf("average=%.2lf\n",(double)sum/N);
}