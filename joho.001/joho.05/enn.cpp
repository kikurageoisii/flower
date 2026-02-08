#include <iostream>
using namespace std;
const double PI = 3.141592;

double area_of_circle(double radius){
    double sum=0;
    sum=PI*radius*radius;
    return sum;
}

int main (void){
    double r=0.0;
    cin>>r;
    cout<<area_of_circle(r);

}