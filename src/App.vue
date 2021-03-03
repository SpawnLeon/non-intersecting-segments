<template>
  <v-app>
    <v-container>
      <v-main>
        <v-row>
          <v-col>
            <v-card>
              <canvas width="500"
                      height="500"
                      ref="canvas"></canvas>
            </v-card>

          </v-col>
          <v-col>
            <v-card>
              <v-list-item v-for="(point, index) in points"
                           :key="index">
                <v-list-item-content>
                  <v-list-item-title>{{ `${point.getX()} : ${point.getY()}` }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-row>
                <v-col md="6"
                       offset-md="3">
                  <v-btn
                    type="submit"
                    color="success"
                    class="ma-4"
                    @click="process"
                  >Обработать
                  </v-btn>
                </v-col>
              </v-row>

            </v-card>

          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn @click="showAddForm = !showAddForm">Задать входные данные</v-btn>
            <v-form v-if="showAddForm"
                    @submit.prevent="addPoint">
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    md="4">
                    <v-text-field
                      v-model.number="x"
                      label="Задайте x"
                      required
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    md="4">
                    <v-text-field
                      v-model.number="y"
                      label="Задайте y"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    md="4">
                    <v-btn
                      type="submit"
                      color="success"
                      class="ml-4">
                      Добавить точку
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-col>

          <v-col></v-col>
        </v-row>
      </v-main>
    </v-container>
  </v-app>
</template>

<script>
/* eslint-disable */
import Point from '@/api/Point';
import Segment from '@/api/Segment';

export default {
  name: 'App',

  components: {},

  data: () => ({
    points: [],
    x: 0,
    y: 0,
    showAddForm: false,
    ctx: null,
  }),
  methods: {
    addPoint() {
      const newPoint = new Point(this.x, this.y);
      this.points.push(newPoint);
      this.x = 0;
      this.y = 0;
    },
    process() {

    },
  },
  watch: {
    points() {

      this.ctx.lineWidth = 1;
      this.ctx.moveTo(100, 100);
      this.points.forEach((p) => {
        this.ctx.lineTo(p.getX(), p.getY());
        this.ctx.stroke();
      });
    },
  },
  async mounted() {
    try {
      const res = await fetch('/input.json', {
        method: 'GET',
      });
      const data = await res.json();
      this.points = data.map((el) => new Point(el[0], el[1]));
    } catch (e) {
      throw Error(e);
    }
    const { canvas } = this.$refs;
    this.ctx = canvas.getContext('2d');

  },
};
</script>
