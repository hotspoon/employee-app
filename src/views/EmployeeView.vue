<template>
  <v-card title="Employee" flat>
    <template v-slot:text>
      <v-text-field
        v-model="search"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line
      ></v-text-field>
    </template>

    <v-data-table :items="desserts" :search="search"></v-data-table>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'NutritionCard',
  setup() {
    const search = ref('')

    const desserts = ref([
      {
        id: 42,
        name: 'bambang',
        gender: 'male',
        email: 'bams@mail.com',
        phone: '08123456789',
        date_of_birth: '1996-06-27',
        address: 'perumahan',
        departement: 'Finance',
        position: 'Senior Staff',
        status: 'active'
      },
      {
        id: 41,
        name: 'siti nur',
        gender: 'female',
        email: 'user1@test.com',
        phone: '081111122',
        date_of_birth: '2005-06-08',
        address: 'jalan',
        departement: 'Product',
        position: 'Junior Staff',
        status: 'active'
      },
      {
        id: 40,
        name: 'Yannuar Wiby tes 1',
        gender: 'male',
        email: 'yannuar.wiby@gmai.com',
        phone: '085735303343',
        date_of_birth: '1993-05-03',
        address: 'Ciputat',
        departement: 'Technical',
        position: 'Assistant Manager',
        status: 'active'
      },
      {
        id: 10,
        name: 'Dewi Permata',
        gender: 'female',
        email: 'z_rahimah@example.com',
        phone: '085627504348',
        date_of_birth: '1989-07-10',
        address: 'Psr. Gajah No. 447, Medan 37018, Sulteng',
        departement: 'Technical',
        position: 'Senior Staff',
        status: 'active'
      },
      {
        id: 8,
        name: 'Maras Hutapea',
        gender: 'male',
        email: 'septi.pranowo@example.com',
        phone: '085221642992',
        date_of_birth: '1976-09-24',
        address: 'Gg. Bahagia  No. 860, Pangkal Pinang 47999, Kaltara',
        departement: 'Product',
        position: 'Senior Staff',
        status: 'active'
      },
      {
        id: 7,
        name: 'Emin Wibowo',
        gender: 'male',
        email: 'eprasasta@example.org',
        phone: '08143815639',
        date_of_birth: '1979-01-16',
        address: 'Jr. Bayam No. 496, Bau-Bau 46068, Aceh',
        departement: 'Finance',
        position: 'Junior Staff',
        status: 'inactive'
      },
      {
        id: 6,
        name: 'Banawa Rajasa',
        gender: 'male',
        email: 'tirawan@example.com',
        phone: '08169031901',
        date_of_birth: '2022-05-17',
        address: 'Kpg. Nangka No. 813, Kediri 40639, Sultra',
        departement: 'Finance',
        position: 'Assistant Manager',
        status: 'active'
      },
      {
        id: 5,
        name: 'Farah Mayasari',
        gender: 'female',
        email: 'mandasari.nova@example.net',
        phone: '085269933529',
        date_of_birth: '2014-01-30',
        address: 'Ki. Camar No. 484, Depok 19211, NTB',
        departement: 'Finance',
        position: 'Junior Staff',
        status: 'inactive'
      },
      {
        id: 4,
        name: 'Yulia Laksmiwati S.E.',
        gender: 'female',
        email: 'damu.susanti@example.net',
        phone: '085225659406',
        date_of_birth: '1977-08-27',
        address: 'Gg. Radio No. 359, Tidore Kepulauan 30048, Sumut',
        departement: 'Technical',
        position: 'Junior Staff',
        status: 'inactive'
      },
      {
        id: 3,
        name: 'Janet Safina Uyainah S.IP',
        gender: 'female',
        email: 'wfujiati@example.org',
        phone: '085258244175',
        date_of_birth: '2020-12-07',
        address: 'Jr. Dewi Sartika No. 813, Semarang 50485, Jateng',
        departement: 'Finance',
        position: 'Senior Staff',
        status: 'inactive'
      },
      {
        id: 2,
        name: 'Malika Wulandari S.T.',
        gender: 'female',
        email: 'ganjaran02@example.org',
        phone: '088846766057',
        date_of_birth: '1982-07-19',
        address: 'Jln. Raden No. 916, Madiun 50859, Sumbar',
        departement: 'Finance',
        position: 'Manager',
        status: 'inactive'
      }
    ])

    return {
      search,
      desserts
    }
  }
})
</script>

<style scoped>
/* Add your styles here */
</style>
