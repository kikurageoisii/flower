#include <iostream>
#include<iomanip>
using namespace std;
int main(void){
    int n,i=0,sum=0;
    do{
        cin>>n;
        sum+=n;
        i++;
    }while(n);
    cout<<fixed<<setprecision(5)<<sum/static_cast<double>(i-1);
}