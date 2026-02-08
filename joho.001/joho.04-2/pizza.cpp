#include<iostream>
using namespace std;
int main(void){
    int a,b;
    cin>>a>>b;
    if(a>=1000||b>=1000){
        if(a>=b){
            b=0;
        }else a=0;
    }
    cout<<a+b<<endl;
}