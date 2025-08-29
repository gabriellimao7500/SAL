import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import './labScheduleCard.css'
/**
 * Card de exibição do status do laboratório.
 *
 * @component
 * @param {Object} props
 * @param {{ id: string, name: string, location: string }} props.lab - Dados do laboratório.
 * @param {React.ReactNode} props.currentContent - Conteúdo da seção "Aula Atual".
 * @param {React.ReactNode} props.nextContent - Conteúdo da seção "Próxima Aula".
 * @returns {JSX.Element}
 */
export function LabScheduleCard({ lab, currentContent, nextContent }) {
    //console.log(lab.reservas);


    return (
        <div
            style={{
                borderRadius: 12,
                boxShadow: "0 2px 12px rgba(2,6,23,0.7)",
                backgroundColor: "#0b1220",
                width: "17vw",
                border: "none",
                display: "flex",
                flexDirection: "column",
                color: "#e6eef8",
            }}
        >
            {/* Header azul (tema escuro) */}
            <div style={{
                background: "#0f1724",
                color: "#fff",
                padding: "12px 14px 6px 12px",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
                textAlign: "left"
            }}>
                <div style={{ fontWeight: 700, fontSize: 18, textAlign: "left", color: "#fff", padding: "12px 0px 0px 16px" }}>{lab.name}</div>
                <div style={{ fontSize: 13, opacity: 0.9, textAlign: "left", color: "#9ca3af", padding: "0px 0px 0px 16px" }}>{lab.location}</div>
                <div style={{ fontSize: 13, marginTop: 4, opacity: 0.85, textAlign: "left", color: "#cbd5e1", padding: "0px 0px 0px 16px" }}>
                    Última Atualização: {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
            </div>
            {/* Conteúdo */}
            <div style={{ padding: "13px 15px", flex: 1, display: "flex", flexDirection: "row", gap: 18, overflowX: "auto", }}>
                <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    navigation={{

                    }}
                    modules={[Navigation]}
                    className="mySwiper"
                    loop={true}
                    style={{
                        "--swiper-navigation-size": "20px",
                        "--swiper-navigation-top-offset": "50%",
                        "--swiper-navigation-sides-offset": "0px",
                        justifyContent: "center",
                        display: "flex",


                    }}
                    centeredSlides={true}

                // onSlideChange={() => console.log('slide change')}
                // onSwiper={(swiper) => console.log(swiper)}
                // modules={[Navigation, Mousewheel]}
                // navigation={{ clickable: true }}
                // onNavigationNext={() => console.log('next')}
                // pagination={true}
                // threshold={2}
                // initialSlide={1}
                // className="mySwiper max-h-[400px] w-full max-w-[100vw]  overflow-hidden  "
                // mousewheel={{
                //     forceToAxis: true,
                //     sensitivity: 1,
                //     releaseOnEdges: true,
                // }}


                // autoplay={{ delay: 1000 }}
                >
                    <SwiperSlide virtualIndex={0}>
                        {/* Aula Anterior */}
                        <div styles={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}>

                            <div style={{
                                fontWeight: 600,
                                fontSize: 15,
                                marginBottom: 8,
                                marginLeft: 16,
                                display: "flex",
                                alignItems: "center",
                                color: "#cbd5e1",
                                textAlign: "left",

                            }}>
                                <span style={{
                                    display: "inline-block",
                                    width: 10,
                                    height: 10,
                                    borderRadius: "50%",
                                    background: "#727272",
                                    boxShadow: "0 0 8px rgba(52,211,153,0.12)",
                                    marginRight: 8,
                                }} />
                                Aula Anterior
                            </div>

                            <div className="textArea-old">
                                {currentContent ? <div style={{ padding: "14px 16px", }}>{currentContent}</div> : <div>Nenhum conteúdo disponível</div>}
                            </div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide virtualIndex={1}>
                        {/* Aula Atual */}
                        <div styles={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}>
                            <div style={{
                                fontWeight: 600,
                                fontSize: 15,
                                marginBottom: 8,
                                display: "flex",
                                alignItems: "center",
                                color: "#86efac",
                                textAlign: "left"
                            }}>
                                <span style={{
                                    display: "inline-block",
                                    width: 10,
                                    height: 10,
                                    borderRadius: "50%",
                                    background: "#34d399",
                                    boxShadow: "0 0 8px rgba(52,211,153,0.12)",
                                    marginRight: 8,
                                }} />
                                Aula Atual
                            </div>
                            <div className="textArea-current">
                                {currentContent ? <div style={{ padding: "14px 16px", }}>{currentContent}</div> : <div>Nenhum conteúdo disponível</div>}
                            </div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide virtualIndex={2}>
                        {/* Próxima Aula */}
                        <div styles={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}>
                            <div style={{
                                fontWeight: 600,
                                fontSize: 15,
                                marginBottom: 8,
                                display: "flex",
                                alignItems: "center",
                                color: "#93c5fd",
                                textAlign: "left"
                            }}>
                                <span style={{
                                    display: "inline-block",
                                    width: 10,
                                    height: 10,
                                    borderRadius: "50%",
                                    background: "#2563eb",
                                    marginRight: 8,
                                }} />
                                Próxima Aula
                            </div>
                            <div className="textArea-next">
                                {nextContent ? <div style={{ padding: "14px 16px", }}>{nextContent}</div> : <div style={{ padding: "14px 16px", }}>Nenhum conteúdo disponível</div>}
                            </div>
                        </div>
                    </SwiperSlide>

                </Swiper>
            </div>
        </div >
    );
}
