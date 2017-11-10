#ifndef LAMBERTIANH
#define LAMBERTIANH

#include "material.h"

float drand48 () {
  return (float)rand()/RAND_MAX;
}

vec3 random_in_unit_sphere() {
  vec3 p;
  do {
    p = 2.0 * vec3(drand48(), drand48(), drand48()) - vec3(1, 1, 1);
  } while(p.squared_length() >= 1.0);
  return p;
}

class lambertian: public material {
public:
  lambertian(const vec3& a): albedo(a) {}
  virtual bool scatter(const ray& r_in, const hit_record& rec, vec3& attenuation, ray& scattered) const {
    vec3 target = rec.p + rec.normal + random_in_unit_sphere();
    scattered = ray(rec.p, target - rec.p);
    attenuation = albedo;
    return true;
  }

public:
  vec3 albedo;
};

#endif