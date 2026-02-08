#include<iostream>
using namespace std;

void irekae(int n,int& a, int& b,int& c){
    int al,bl,cl;
    al=a;
    bl=b;
    cl=c;
    switch(n){
        case 1:
        b=al;
        a=bl;
        break;
        
        case 2:
        b=cl;
        c=bl;
        break;
        
        case 3:
        a=cl;
        c=al;
        break;
    }
}

int main(void){
    int a,b,c;
    int n[4];
    cin>>a>>b>>c;
    for(int i=0;i<=3;i++){
        cin>>n[i];
        irekae(n[i],a,b,c);
        
    }
    cout<<a<<" "<<b<<" "<<c<<endl;
}