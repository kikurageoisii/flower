#include<iostream>
using namespace std;
int main(void){
    int a,b,c,X,x,d=0;
    cin>>a>>b>>c>>X;
    x=X/50;
     for(int i=0;i<=a;i++){
        for(int j=0;j<=b;j++){
            for(int k=0;k<=c;k++){
                if(x==10*i+2*j+k){
                    d++;
                }
            }
        }
     }
    cout<<d<<endl;
}