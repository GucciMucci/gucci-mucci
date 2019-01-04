import React, { Component } from "react";
import "./checkoutAccordion.scss";

export default class CheckoutAccordion extends Component {
  render() {
    return (
      <div>
        <div class="accordion-box">
          <label for="label01">MAY WE HELP?</label>
          <input type="checkbox" id="label01" class="accordion-check" />

          <div class="accordion-contents">
            <ul>
              <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</li>
              <li>
                Possimus, saepe? Alias itaque pariatur, soluta quo sint odit
                quaerat voluptatum laudantium perferendis
              </li>
              <li>
                recusandae facere doloribus esse error suscipit explicabo ea
                velit?
              </li>
            </ul>
          </div>
          {/* //contents */}
          <label for="label02">PAYMENT OPTIONS</label>
          <input type="checkbox" id="label02" class="accordion-check" />
          {/* //contents */}
          <div class="accordion-contents">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus,
            saepe? Alias itaque pariatur, soluta quo sint odit quaerat
            voluptatum laudantium perferendis recusandae facere doloribus esse
            error suscipit explicabo ea velit?
          </div>
          {/* //contents */}
          <label for="label03">SHIPPING OPTIONS</label>
          <input type="checkbox" id="label03" class="accordion-check" />
          {/* //contents */}
          <div class="accordion-contents">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus,
            saepe? Alias itaque pariatur, soluta quo sint odit quaerat
            voluptatum laudantium perferendis recusandae facere doloribus esse
            error suscipit explicabo ea velit?
          </div>

          {/* //contents */}
        </div>
      </div>
    );
  }
}
