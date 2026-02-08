#include<iostream>
using namespace std;

void read_array (int a[],int n){ //この時点ではconst使ってはいけない
    for(int i=0;i<n;i++){
        cin>>a[i];
    }
}
void narabikae(int a[],int n){
    for(int e=n-1;-1<e;e--){
        for(int i=0;i<e;i++){
            if(!(a[i]<a[i+1])){
                int e=a[i];
                int d=a[i+1];
                a[i]=d;
                a[i+1]=e;
            }
        }
    }
}


int main(void){
    int n=10;
    int a[n];
    read_array(a,n);
    narabikae(a,n);
  
    
    for(int i=0;i<n;i++){
        cout<<a[i]<<" ";
    }
    cout<<endl;

}