#include<stdio.h>
#include<math.h>
int main (void){
    int i;
    int a;
    double d=1;
    scanf("%d",&a);
    if(a>0){
        for(i=0;i<a;i++){
            d=d*2;
            }
    }else{
        a=-a;
        for(i=0;i<a;i++){
            d=d/2;
        }
       }
    d=d-1; 
    d=floor(d*1000)/1000;
    printf("%.2lf\n",d);
}