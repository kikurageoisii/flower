#include <iostream>
#include <cmath>
#include<vector>
#include<iomanip>//小数第６位まで
using namespace std;

//h
double heikin(int n, const vector<double>& x){ //vectorの使い方
    double sum=0.0;
    for(int i=0;i<n;i++){
        sum+=x[i];
    }
    return sum/n;
}

double hyoujunnhensa(int n,const vector<double>& x){
    
    const double hei = heikin(n,x); //引数の宣言の仕方注意 
    double sum=0.0;
    for(int i=0;i<n;i++){
        sum+=(hei-x[i])*(hei-x[i]);
    }
    return sqrt(sum/n);
}

int ifcinh(void){
    cout<<"de-ta no kosuu"<<endl;
    int n=0;
    cin>>n;
vector<double> x(n);
    cout<<"de-ta atai"<<endl;
    for(int i=0;i<n;i++){
        cin>>x[i];
    }
    cout<<"heikin"<<" "<<fixed<<setprecision(6)<<heikin(n,x)<<endl;
    cout<<"hyoujunn hennsa"<<" "<<fixed<<setprecision(6)<<hyoujunnhensa(n,x)<<endl;

}
//四則演算を行う
double sisoku(double ans,double x){
    
}


int main(void){
    char h;
    char ok;
    while(cin>>ok){
        if(cin>>h){
            ifcinh();

        }
    }
}