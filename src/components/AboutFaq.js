"use client";

import React from 'react';
import { Container } from 'react-bootstrap';
import styles from "@/styles/AboutFaq.module.css";

export default function AboutFaq() {
    const Accordian = [
        {
            id: "flush-collapseOne",
            heading: "flush-headingOne",
            expanded: true,
            title: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit?",
        },
        {
            id: "flush-collapseTwo",
            heading: "flush-headingTwo",
            expanded: false,
            title: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit?",
        },
        {
            id: "flush-collapseThree",
            heading: "flush-headingThree",
            expanded: false,
            title: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit?",
        },
        {
            id: "flush-collapseFour",
            heading: "flush-headingFour",
            expanded: false,
            title: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit?",
        },
        {
            id: "flush-collapseFive",
            heading: "flush-headingFive",
            expanded: false,
            title: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit?",
        }
    ];

    return (
        <div className={styles.AboutFaq}>
            <Container>
                <div className="pt-5 ps-3  pb-3 text-light" id={styles.aboutFaqHeading}>
                    <h1>Frequently Asked Questions?</h1>
                </div>
                <div className="d-flex">
                    <div className="col-md-8 col-sm-12 col-xl-8 col-xxl-8 col-lg-8">
                        <div className={styles.Accordian}>
                            <div
                                className="accordion accordion-flush mb-5"
                                id="accordionFlushExample"
                            >
                                {Accordian.map((item, index) => (
                                    <div className="accordion-item" key={index} style={{ background: "transparent" }}>
                                        <h2 className="accordion-header" id={item.heading}>
                                            <button
                                                className={`accordion-button ${item.expanded ? "" : "collapsed"
                                                    } bg-transparent text-light`}
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target={`#${item.id}`}
                                                aria-expanded={item.expanded}
                                                aria-controls={item.id}
                                                id={styles.ab}
                                            >
                                                {item.title}
                                            </button>
                                        </h2>

                                        <div
                                            id={item.id}
                                            className={`accordion-collapse collapse bg-transparent text-secondary ${item.expanded ? "show" : ""
                                                }`}
                                            aria-labelledby={item.heading}
                                            data-bs-parent="#accordionFlushExample"
                                        >
                                            <div className="accordion-body">
                                                Our subscriptions allow you to select a delivery frequency
                                                that best suits your needs - either weekly, bi-weekly, or
                                                monthly. You can also choose the number of deliveries for
                                                your subscription. Choose any combination that works for
                                                you!{" "}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-12 col-xl-4 col-xxl-4 col-lg-4">

                        <div className={styles.rightBox}>
                            <h3>Still Have Other Questions?</h3>
                            <p>
                                I am text block. Click edit button to change this text. Lorem ipsum
                                dolor sit amet, consectetur adipiscing elit.
                            </p>

                            <button className={styles.contactBtn}>Contact Us</button>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
