#include<iostream>
using namespace std;
int main (void){
    int a;
    cin>>a;
    for(int i=0;i<a;i++){
        for(int d=0;d<=i;d++){
            cout<<"*";
        }
        cout<<endl;
    }
}